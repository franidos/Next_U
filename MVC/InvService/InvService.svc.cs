using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using DTO;
using DataAccess;

namespace InvService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service1.svc or Service1.svc.cs at the Solution Explorer and start debugging.

    

    public class InvService : IInvService
    {

        ModelAlmacen db = ModelAlmacen.GetInstance();
        public void AddItem(Almacen item)
        {
            try
            {
                db.Almacen.Add(item);
                db.SaveChanges();
                
            }
            catch (Exception ex)
            {
              //Guardar LOG
            }            
        }

        public List<Almacen> GetAll()
        {
            var list = db.Almacen.ToList();
            return list;
            
        }

        public Almacen GetItem(int id)
        {
            var item = db.Almacen.Find(id);
            return item;          
        }
    }
}
