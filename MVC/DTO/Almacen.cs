namespace DTO
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Almacen")]
    public partial class Almacen
    {
        [Key]
        public int ID { get; set; }

        [StringLength(50)]
        public string Nombre { get; set; }

        [Column(TypeName = "numeric")]
        public decimal? Stock { get; set; }
    }
}
