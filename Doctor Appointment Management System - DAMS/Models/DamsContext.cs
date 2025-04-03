using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Doctor_Appointment_Management_System___DAMS.Models;

public partial class DamsContext : DbContext
{
    public DamsContext()
    {
    }

    public DamsContext(DbContextOptions<DamsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Appointment> Appointments { get; set; }

    public virtual DbSet<Department> Departments { get; set; }

    public virtual DbSet<HealthCareInstitution> HealthCareInstitutions { get; set; }

    public virtual DbSet<InstitutionType> InstitutionTypes { get; set; }

    public virtual DbSet<MedicalRecord> MedicalRecords { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<PaymentStatus> PaymentStatuses { get; set; }

    public virtual DbSet<Prescription> Prescriptions { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserInstitution> UserInstitutions { get; set; }

    public virtual DbSet<UserRole> UserRoles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=HP_DATORN\\SQLEXPRESS;Database=DAMS;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.Property(e => e.AppointmentId).HasColumnName("AppointmentID");
            entity.Property(e => e.AppointmentDate).HasColumnType("datetime");
            entity.Property(e => e.DoctorId).HasColumnName("DoctorID");
            entity.Property(e => e.InstitutionId).HasColumnName("InstitutionID");
            entity.Property(e => e.PatientId).HasColumnName("PatientID");
            entity.Property(e => e.Status).HasMaxLength(50);

            entity.HasOne(d => d.Doctor).WithMany(p => p.AppointmentDoctors)
                .HasForeignKey(d => d.DoctorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Appointments_Users1");

            entity.HasOne(d => d.Institution).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.InstitutionId)
                .HasConstraintName("FK_Appointments_HealthCareInstitutions");

            entity.HasOne(d => d.Patient).WithMany(p => p.AppointmentPatients)
                .HasForeignKey(d => d.PatientId)
                .HasConstraintName("FK_Appointments_Users");
        });

        modelBuilder.Entity<Department>(entity =>
        {
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.DepartmentName).HasMaxLength(50);
            entity.Property(e => e.Description).IsUnicode(false);
            entity.Property(e => e.InstitutionId).HasColumnName("InstitutionID");

            entity.HasOne(d => d.Institution).WithMany(p => p.Departments)
                .HasForeignKey(d => d.InstitutionId)
                .HasConstraintName("FK_Departments_HealthCareInstitutions");
        });

        modelBuilder.Entity<HealthCareInstitution>(entity =>
        {
            entity.HasKey(e => e.InstitutionId);

            entity.Property(e => e.InstitutionId).HasColumnName("InstitutionID");
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.InstitutionTypeId).HasColumnName("InstitutionTypeID");
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber).HasMaxLength(50);

            entity.HasOne(d => d.InstitutionType).WithMany(p => p.HealthCareInstitutions)
                .HasForeignKey(d => d.InstitutionTypeId)
                .HasConstraintName("FK_HealthCareInstitutions_InstitutionTypes");
        });

        modelBuilder.Entity<InstitutionType>(entity =>
        {
            entity.Property(e => e.InstitutionTypeId).HasColumnName("InstitutionTypeID");
            entity.Property(e => e.TypeName).HasMaxLength(50);
        });

        modelBuilder.Entity<MedicalRecord>(entity =>
        {
            entity.Property(e => e.MedicalRecordId).HasColumnName("MedicalRecordID");
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.DoctorId).HasColumnName("DoctorID");
            entity.Property(e => e.InstitutionId).HasColumnName("InstitutionID");
            entity.Property(e => e.PatientId).HasColumnName("PatientID");

            entity.HasOne(d => d.Doctor).WithMany(p => p.MedicalRecordDoctors)
                .HasForeignKey(d => d.DoctorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MedicalRecords_Users1");

            entity.HasOne(d => d.Institution).WithMany(p => p.MedicalRecords)
                .HasForeignKey(d => d.InstitutionId)
                .HasConstraintName("FK_MedicalRecords_HealthCareInstitutions");

            entity.HasOne(d => d.Patient).WithMany(p => p.MedicalRecordPatients)
                .HasForeignKey(d => d.PatientId)
                .HasConstraintName("FK_MedicalRecords_Users");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK_Bills");

            entity.Property(e => e.PaymentId).HasColumnName("PaymentID");
            entity.Property(e => e.AppointmentId).HasColumnName("AppointmentID");
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.Fee).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.PatientId).HasColumnName("PatientID");
            entity.Property(e => e.StatusId).HasColumnName("StatusID");

            entity.HasOne(d => d.Appointment).WithMany(p => p.Payments)
                .HasForeignKey(d => d.AppointmentId)
                .HasConstraintName("FK_Payments_Appointments");

            entity.HasOne(d => d.Status).WithMany(p => p.Payments)
                .HasForeignKey(d => d.StatusId)
                .HasConstraintName("FK_Payments_PaymentStatus");
        });

        modelBuilder.Entity<PaymentStatus>(entity =>
        {
            entity.ToTable("PaymentStatus");

            entity.Property(e => e.PaymentStatusId).HasColumnName("PaymentStatusID");
            entity.Property(e => e.StatusName).HasMaxLength(50);
        });

        modelBuilder.Entity<Prescription>(entity =>
        {
            entity.Property(e => e.PrescriptionId).HasColumnName("PrescriptionID");
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.DoctorId).HasColumnName("DoctorID");
            entity.Property(e => e.Dosage).HasMaxLength(50);
            entity.Property(e => e.InstitutionId).HasColumnName("InstitutionID");
            entity.Property(e => e.Medication).HasMaxLength(50);
            entity.Property(e => e.PatientId).HasColumnName("PatientID");

            entity.HasOne(d => d.Doctor).WithMany(p => p.PrescriptionDoctors)
                .HasForeignKey(d => d.DoctorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Prescriptions_Users1");

            entity.HasOne(d => d.Institution).WithMany(p => p.Prescriptions)
                .HasForeignKey(d => d.InstitutionId)
                .HasConstraintName("FK_Prescriptions_HealthCareInstitutions");

            entity.HasOne(d => d.Patient).WithMany(p => p.PrescriptionPatients)
                .HasForeignKey(d => d.PatientId)
                .HasConstraintName("FK_Prescriptions_Users");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.About).HasColumnType("text");
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Fee).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber).HasMaxLength(50);
            entity.Property(e => e.RoleId).HasColumnName("RoleID");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK_Users_UserRoles");
        });

        modelBuilder.Entity<UserInstitution>(entity =>
        {
            entity.ToTable("UserInstitution");

            entity.Property(e => e.UserInstitutionId).HasColumnName("UserInstitutionID");
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.WorkingDays).HasMaxLength(50);

            entity.HasOne(d => d.Department).WithMany(p => p.UserInstitutions)
                .HasForeignKey(d => d.DepartmentId)
                .HasConstraintName("FK_UserInstitution_Departments");

            entity.HasOne(d => d.User).WithMany(p => p.UserInstitutions)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_UserInstitution_Users");
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.HasKey(e => e.RoleId);

            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.RoleName).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
