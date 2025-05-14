import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const RoleSwitcher: React.FC = () => {
  const [roles, setRoles] = useState<string[]>([]);
  const [currentRole, setCurrentRole] = useState<string | null>(localStorage.getItem("role"));

  useEffect(() => {
    const fetchRoles = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch("https://localhost:7036/api/Role/available-roles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRoles(data);
        console.log("[RoleSwitcher] roles:", data, "currentRole:", localStorage.getItem("role"));
      } else {
        console.log("[RoleSwitcher] roles fetch failed", res.status);
      }
    };
    fetchRoles();
  }, []);

  const switchRole = async (role: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch("https://localhost:7036/api/Role/switch-role", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(role),
    });
    if (res.ok) {
      setCurrentRole(role);
      localStorage.setItem("role", role);
      window.location.reload();
    }
  };

  // Normalize role names
  const normalizedCurrentRole = currentRole?.toLowerCase();
  // Prikazuj dugmad za sve role osim trenutne
  const allowedSwitchRoles = roles.filter(r => r.toLowerCase() !== normalizedCurrentRole);
  if (!roles.length || !currentRole || allowedSwitchRoles.length === 0) {
    // Ne prikazuj ništa ako nema promjene
    return null;
  }
  return (
    <div className="flex flex-col items-start">
      <div className="flex gap-2 items-center rounded bg-gray-100 px-2 py-1 shadow-sm border border-gray-200 ml-2">
        <span className="font-semibold text-gray-700 text-sm">Role:</span>
        <span className="text-blue-700 font-bold text-sm">{currentRole}</span>
        {allowedSwitchRoles.map(role => (
          <Button key={role} onClick={() => switchRole(role)} className="ml-2 bg-gray-200 text-blue-700 hover:bg-blue-100 text-xs px-2 py-1">
            Switch to {role}
          </Button>
        ))}
      </div>
      {/* DEBUG INFO: Remove after troubleshooting */}
      <div className="text-xs text-gray-500 mt-1 bg-yellow-50 border border-yellow-200 rounded p-1">
        <div>roles: {JSON.stringify(roles)}</div>
        <div>currentRole: {JSON.stringify(currentRole)}</div>
      </div>
    </div>
  );
};

export default RoleSwitcher;
