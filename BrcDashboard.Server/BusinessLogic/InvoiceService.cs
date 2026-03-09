using BrcDashboard.Server.Models;
using BrcDashboard.Server.Data;

namespace BrcDashboard.Server.BusinessLogic
{
    public class InvoiceService
    {
        private readonly InvoiceRepo _invoiceRepo;

        public InvoiceService(InvoiceRepo invoiceRepo)
        {
            _invoiceRepo = invoiceRepo;
        }

        public List<Invoices> GetAllInvoices()
        {
            return _invoiceRepo.GetAllInvoices();
        }
        public Invoices? GetInvoiceById(int id)
        {
            return _invoiceRepo.GetInvoiceById(id);
        }
        public Invoices AddInvoice(Invoices newInvoice)
        {
            return _invoiceRepo.AddInvoice(newInvoice); ;
        }
        public bool DeleteInvoice(int id)
        {
            return _invoiceRepo.DeleteInvoice(id);
        }

        public bool UpdateInvoice(int id, Invoices updatedInvoice)
        {
            return _invoiceRepo.UpdateInvoice(id, updatedInvoice);
        }
    }
}

