using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Order
    {
        public int Id { get; set; }

        
        public string? UserId { get; set; }

        public string CustomerName { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string? Comment { get; set; }

        public string Status { get; set; } = "Очікує обробки";
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public decimal Total { get; set; }

        public List<OrderProduct> Products { get; set; } = new();
    }
}
