namespace DataAccess
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;
    using DTO;

    public partial class ModelDatos : DbContext
    {
        private static ModelDatos instance = null;
        

        public static ModelDatos  GetInstance()
        {
            if(instance == null)
            {
                instance = new ModelDatos();
            }
            return instance;

        }
        private ModelDatos()
            : base("name=ModelDatos")
        {
        }

        public virtual DbSet<Productos> Productos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Productos>()
                .Property(e => e.Peso)
                .HasPrecision(18, 0);
        }
    }
}
