namespace DTO
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class Productos
    {
        [Key]
        public int ProductID { get; set; }

        [Required]
        [StringLength(150)]
        public string Nombre { get; set; }

        public decimal Peso { get; set; }

        public int? UserID { get; set; }

        [StringLength(50)]
        public string Categoria { get; set; }
    }
}
