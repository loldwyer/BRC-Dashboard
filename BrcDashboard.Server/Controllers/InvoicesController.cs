using Microsoft.AspNetCore.Mvc;
using BrcDashboard.Server.Models;
using BrcDashboard.Server.BusinessLogic;

namespace BrcDashboard.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvoicesController : ControllerBase
    {
        // Temporary in-memory list
        private readonly InvoiceService _invoiceService;
            public InvoicesController(InvoiceService invoiceService)
            {
                _invoiceService = invoiceService;
            }

        // GET: api/invoices
        [HttpGet]
        public ActionResult<IEnumerable<Invoices>> GetInvoices()
        {
            return Ok(_invoiceService.GetAllInvoices());
        }

        // GET: api/invoices/1
        [HttpGet("{id}")]
        public ActionResult<Invoices> GetInvoice(int id)
        {
            var invoice = _invoiceService.GetInvoiceById(id);

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
            var createdInvoice= _invoiceService.AddInvoice(invoice);

            return CreatedAtAction(nameof(GetInvoice), new { id = createdInvoice.id }, createdInvoice);
        }

        // PUT: api/invoices/1
        [HttpPut("{id}")]
        public IActionResult UpdateInvoice(int id, Invoices updatedInvoice)
        {
            var updated = _invoiceService.UpdateInvoice(id, updatedInvoice);
            if (!updated)
            {
                return NotFound();
            }
            return NoContent();
        }

        // DELETE: api/invoices/1
        [HttpDelete("{id}")]
        public IActionResult DeleteInvoice(int id)
        {
            var deleted = _invoiceService.DeleteInvoice(id);
            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
