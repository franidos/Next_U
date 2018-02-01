namespace DataAccess
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using DTO;

    public partial class ModelAlmacen : DbContext
    {
        private static ModelAlmacen instance = null;

        private ModelAlmacen()
            : base("name=ModelAlmacen")
        {
           
        }

        public static ModelAlmacen GetInstance ()
        {
            if (instance == null)
                instance = new ModelAlmacen();

            return instance;
        }

        public virtual DbSet<Almacen> Almacen { get; set; }
        public virtual DbSet<Productos> Productos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Almacen>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<Almacen>()
                .Property(e => e.Stock)
                .HasPrecision(18, 0);

            modelBuilder.Entity<Productos>()
                .Property(e => e.Peso)
                .HasPrecision(18, 0);
        }
    }
}
