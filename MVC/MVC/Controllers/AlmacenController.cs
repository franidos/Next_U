using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using DTO;
using DataAccess;

namespace MVC.Controllers
{
    public class AlmacenController : Controller
    {
        WCFInventario.InvServiceClient service = null;

        // GET: Almacen
        public ActionResult Index()
        {
            using (service = new WCFInventario.InvServiceClient())
            {
              List<Almacen> list = service.GetAll();
                return View(list);

            }
          
        }
            

        // GET: Almacen/Create
        public ActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Almacen almacen)
        {
            if (ModelState.IsValid)
            {
                using (service = new WCFInventario.InvServiceClient())
                {
                    service.AddItem(almacen);
                    
                }
            }
            return RedirectToAction("Index");
        }



    }
}
