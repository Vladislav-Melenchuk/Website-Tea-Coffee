using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class OrderItemDto
    {
        [Required] public int ProductId { get; set; }
        [Range(1, int.MaxValue)] public int Quantity { get; set; }
        [Range(0, 999999)] public decimal Price { get; set; }
    }

    public class OrderCreateDto
    {

        [Required, MinLength(2)]
        public string CustomerName { get; set; } = null!;

        [Required, MinLength(5)]
        public string Phone { get; set; } = null!;

        [Required, MinLength(5)]
        public string Address { get; set; } = null!;

        public string? Comment { get; set; }

        [Required, MinLength(1)]
        public List<OrderItemDto> Items { get; set; } = new();
    }

    
    public class OrderListItemDto
    {
        public int Id { get; set; }
        public string CustomerName { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Status { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public decimal Total { get; set; }
        public int ItemsCount { get; set; }
    }

    
    public class OrderDetailsDto
    {
        public int Id { get; set; }
       
        public string CustomerName { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string? Comment { get; set; }
        public string Status { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public decimal Total { get; set; }

        public List<OrderDetailsItem> Items { get; set; } = new();
    }

    public class OrderDetailsItem
    {
        public int ProductId { get; set; }
        public string Title { get; set; } = null!;
        public string ImageUrl { get; set; } = null!;
        public int Quantity { get; set; }
        public decimal Price { get; set; } 
        public decimal Subtotal => Price * Quantity;
    }

    
    public class OrderStatusUpdateDto
    {
        [Required] public string Status { get; set; } = null!;
    }
}
