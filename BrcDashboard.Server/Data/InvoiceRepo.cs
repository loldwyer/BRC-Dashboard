using BrcDashboard.Server.Models;
namespace BrcDashboard.Server.Data
{
    public class InvoiceRepo
    {
        private readonly List<Invoices> invoiceList = new()
        {
            new Invoices
            {
                id = 1,
                invoice_number = "INV-1001",
                customer_name = "Acme Ltd",
                amount = 1250.00m,
                issue_date = new DateTime(2026, 3, 1),
                due_date = new DateTime(2026, 3, 15),
                status = "Paid"
            },
            new Invoices
            {
                id = 2,
                invoice_number = "INV-1002",
                customer_name = "Northwind Trading",
                amount = 890.50m,
                issue_date = new DateTime(2026, 3, 3),
                due_date = new DateTime(2026, 3, 17),
                status = "Pending"
            },
            new Invoices
            {
                id = 3,
                invoice_number = "INV-1003",
                customer_name = "Bluewave Services",
                amount = 2140.75m,
                issue_date = new DateTime(2026, 3, 5),
                due_date = new DateTime(2026, 3, 20),
                status = "Overdue"
            }
        };
        public List<Invoices> GetAllInvoices()
        {
            return invoiceList;
        }
        public Invoices? GetInvoiceById(int id)
            {
                return invoiceList.FirstOrDefault(i => i.id == id);
            }
            public Invoices AddInvoice(Invoices newInvoice)
            {
                newInvoice.id = invoiceList.Max(i => i.id) + 1; // Simple ID generation
                invoiceList.Add(newInvoice);
                return newInvoice;
            }
            public bool DeleteInvoice(int id)
            {
                var invoice = invoiceList.FirstOrDefault(i => i.id == id);
                if (invoice == null)
                {
                    return false;
                }
                invoiceList.Remove(invoice);
                return true;
        }
        public bool UpdateInvoice(int id, Invoices updatedInvoice)
        {
            var existingInvoice = invoiceList.FirstOrDefault(i => i.id == id);
            if (existingInvoice == null)
            {
                return false;
            }
            existingInvoice.invoice_number = updatedInvoice.invoice_number;
            existingInvoice.customer_name = updatedInvoice.customer_name;
            existingInvoice.amount = updatedInvoice.amount;
            existingInvoice.issue_date = updatedInvoice.issue_date;
            existingInvoice.due_date = updatedInvoice.due_date;
            existingInvoice.status = updatedInvoice.status;
            return true;
        }
    }
}
