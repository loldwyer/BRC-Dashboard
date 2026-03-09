namespace BrcDashboard.Server.Models
{
    public class Invoices
    {
        public int id { get; set; }
        public string invoice_number { get; set; } = "";
        public string customer_name { get; set; } = "";
        public decimal amount { get; set; }
        public DateTime due_date { get; set; }
        public DateTime issue_date { get; set; }
        public string status { get; set; } = "";
    }
}
