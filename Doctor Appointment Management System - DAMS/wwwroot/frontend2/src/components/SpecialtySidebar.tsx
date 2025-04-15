interface SpecialtySidebarProps {
  specialties: string[];
  onSpecialtyClick: (specialty: string) => void;
  onReset?: () => void;
}

const SpecialtySidebar: React.FC<SpecialtySidebarProps> = ({
  specialties,
  onSpecialtyClick,
}) => {
  const icons: Record<string, string> = {
    Cardiology: "/assets/cardiology.svg",
    Neurology: "/assets/neurology.svg",
    Pulmonology: "/assets/pulmonology.svg",
    Pediatrics: "/assets/pediatrics.svg",
    Oncology: "/assets/oncology.svg",
    "Infectious Diseases": "/assets/infectiousdiseases.svg",
    Dermatology: "/assets/dermatology.svg",
    Psychiatry: "/assets/psychiatry.svg",
    Gynecology: "/assets/gynecology.svg",
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Specialties</h3>
      <ul className="space-y-2">
        {specialties.map((specialty) => (
          <li key={specialty}>
            <button
              onClick={() => onSpecialtyClick(specialty)}
              className="w-full flex items-center gap-3 text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md shadow-sm"
            >
              <img src={icons[specialty]} alt={specialty} className="w-6 h-6" />
              <span>{specialty}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpecialtySidebar;
