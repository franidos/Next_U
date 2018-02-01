using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using DTO;
using DataAccess;

namespace WCFService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.

    
    public class Service : IService
    {
        private ModelDatos db = ModelDatos.GetInstance();

        public void AddProduct(Productos value)
        {
            try
            {
                db.Productos.Add(value);
                db.SaveChanges();
            }
            catch (Exception ex)
            {
                //Gardar LOG
            }
        }

        public List<Productos> GetAll()
        {
            return db.Productos.ToList();            
        }
    }
}
