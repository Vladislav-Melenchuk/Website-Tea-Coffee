using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTOs;
using Server.Models;
using System.Security.Claims;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public OrdersController(AppDbContext context) => _context = context;

        [HttpPost]
        public async Task<ActionResult<OrderDetailsDto>> Create([FromBody] OrderCreateDto dto)
        {
            if (!ModelState.IsValid) return ValidationProblem(ModelState);

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                
                return Unauthorized("Користувач не автентифікований");
            }

            var ids = dto.Items.Select(i => i.ProductId).ToList();
            var products = await _context.Products
                .Where(p => ids.Contains(p.Id))
                .ToListAsync();

            if (products.Count != ids.Count)
                return BadRequest("Деякі товари не знайдено.");

            var order = new Order
            {
                UserId = userId,
                CustomerName = dto.CustomerName,
                Phone = dto.Phone,
                Address = dto.Address,
                Comment = dto.Comment,
                Status = "Очікує обробки"
            };

            foreach (var i in dto.Items)
            {
                order.Products.Add(new OrderProduct
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity,
                    Price = i.Price
                });
            }

            order.Total = order.Products.Sum(x => x.Price * x.Quantity);

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = order.Id }, await MapDetails(order.Id));
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderListItemDto>>> GetAll([FromQuery] string? status, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            if (page <= 0) page = 1;
            if (pageSize <= 0 || pageSize > 100) pageSize = 20;

            var q = _context.Orders.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(status))
                q = q.Where(o => o.Status == status);

            var data = await q
                .OrderByDescending(o => o.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(o => new OrderListItemDto
                {
                    Id = o.Id,
                    CustomerName = o.CustomerName,
                    Phone = o.Phone,
                    Status = o.Status,
                    CreatedAt = o.CreatedAt,
                    Total = o.Total,
                    ItemsCount = o.Products.Count
                })
                .ToListAsync();

            return Ok(data);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetailsDto>> GetById(int id)
        {
            var dto = await MapDetails(id);
            if (dto == null) return NotFound();
            return Ok(dto);
        }

        
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] OrderStatusUpdateDto dto)
        {
            if (!ModelState.IsValid) return ValidationProblem(ModelState);

            var order = await _context.Orders.FindAsync(id);
            if (order == null) return NotFound();

            order.Status = dto.Status;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private async Task<OrderDetailsDto?> MapDetails(int id)
        {
            var order = await _context.Orders
                .Include(o => o.Products)
                .ThenInclude(op => op.Product)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null) return null;

            var dto = new OrderDetailsDto
            {
                Id = order.Id,
                CustomerName = order.CustomerName,
                Phone = order.Phone,
                Address = order.Address,
                Comment = order.Comment,
                Status = order.Status,
                CreatedAt = order.CreatedAt,
                Total = order.Total,
                Items = order.Products.Select(op => new OrderDetailsItem
                {
                    ProductId = op.ProductId,
                    Title = op.Product.Title,
                    ImageUrl = op.Product.ImageUrl,
                    Quantity = op.Quantity,
                    Price = op.Price
                }).ToList()
            };

            return dto;
        }

        
        [HttpGet("my")]
        public async Task<ActionResult<IEnumerable<OrderListItemDto>>> GetMyOrders()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.CreatedAt)
                .Select(o => new OrderListItemDto
                {
                    Id = o.Id,
                    CustomerName = o.CustomerName,
                    Phone = o.Phone,
                    Status = o.Status,
                    CreatedAt = o.CreatedAt,
                    Total = o.Total,
                    ItemsCount = o.Products.Count
                })
                .ToListAsync();

            return Ok(orders);
        }

    }
}
