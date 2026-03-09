using Microsoft.AspNetCore.Mvc;
using BrcDashboard.Server.Models;

namespace BrcDashboard.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvoicesController : ControllerBase
    {
        // Temporary in-memory list
        private static readonly List<Invoices> invoiceList = new()
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

        // GET: api/invoices
        [HttpGet]
        public ActionResult<IEnumerable<Invoices>> GetInvoices()
        {
            return Ok(invoiceList);
        }

        // GET: api/invoices/1
        [HttpGet("{id}")]
        public ActionResult<Invoices> GetInvoice(int id)
        {
            var invoice = invoiceList.FirstOrDefault(i => i.id == id);

            if (invoice == null)
            {
                return NotFound();
            }

            return Ok(invoice);
        }

        // POST: api/invoices
        [HttpPost]
        public ActionResult<Invoices> CreateInvoice(Invoices invoice)
        {
            invoice.id = invoiceList.Max(i => i.id) + 1;
            invoiceList.Add(invoice);

            return CreatedAtAction(nameof(GetInvoice), new { id = invoice.id }, invoice);
        }

        // PUT: api/invoices/1
        [HttpPut("{id}")]
        public IActionResult UpdateInvoice(int id, Invoices updatedInvoice)
        {
            var existingInvoice = invoiceList.FirstOrDefault(i => i.id == id);

            if (existingInvoice == null)
            {
                return NotFound();
            }

            existingInvoice.invoice_number = updatedInvoice.invoice_number;
            existingInvoice.customer_name = updatedInvoice.customer_name;
            existingInvoice.amount = updatedInvoice.amount;
            existingInvoice.issue_date = updatedInvoice.issue_date;
            existingInvoice.due_date = updatedInvoice.due_date;
            existingInvoice.status = updatedInvoice.status;

            return NoContent();
        }

        // DELETE: api/invoices/1
        [HttpDelete("{id}")]
        public IActionResult DeleteInvoice(int id)
        {
            var invoice = invoiceList.FirstOrDefault(i => i.id == id);

            if (invoice == null)
            {
                return NotFound();
            }

            invoiceList.Remove(invoice);

            return NoContent();
        }
    }
}
