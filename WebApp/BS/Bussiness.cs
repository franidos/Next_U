using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BS
{
    public class Bussiness
    {
        ServiceReference.ServiceClient cli = new ServiceReference.ServiceClient();
        private static Bussiness inst = null;

        public static Bussiness GetInstance ()
        {
            if (inst == null)
                inst = new Bussiness();

            return inst;
        }
        public void AddProduct(Productos value)
        {
            cli.AddProduct(value);
        }

        public List<Productos> GetAll()
        {
            return cli.GetAll();
        }

    }
}
