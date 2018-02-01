using BS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DTO;

namespace WebApp.Controllers
{
    public class ProductController : Controller
    {
        Bussiness conect = Bussiness.GetInstance();

        // GET: Product
        public ActionResult Index()
        {            
            return View(conect.GetAll());
        }
    
        // GET: Product/Create
        [ValidateAntiForgeryToken]
        public ActionResult Crear()
        {
            return View();
        }

        // POST: Product/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Crear(Productos collection)
        {
            try
            {
                conect.AddProduct(collection);

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
