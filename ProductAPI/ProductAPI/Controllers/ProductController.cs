using Microsoft.AspNetCore.Mvc;
using ProductAPI.Converters;
using ProductAPI.Models;
using ProductAPI.Services;
using System.Net;

namespace ProductAPI.Controllers
{
    [ApiController]
    [Route("product")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public IActionResult GetAllProduct()
        {
            return Ok(_productService.GetProductList());
        }

        [HttpGet("{productId}")]
        public IActionResult GetProduct(int productId)
        {
            if (!_productService.IsProductExists(productId))
            {
                return NotFound();
            }

            return Ok(_productService.GetProduct(productId));
        }

        [HttpPost]
        public IActionResult CreateProduct(Product product)
        {
            if (_productService.IsProductExists(product.Id))
            {
                return Conflict("Product with this ID already exists");
            }

            _productService.CreateProduct(product);

            return Ok();
        }

        [HttpPut]
        public IActionResult EditProduct(Product product)
        {
            if (!_productService.IsProductExists(product.Id))
            {
                return NotFound();
            }

            _productService.UpdateProduct(product);

            return NoContent();
        }

        [HttpDelete("{productId}")]
        public IActionResult DeleteProduct(int productId)
        {
            if (!_productService.IsProductExists(productId))
            {
                return NotFound();
            }

            _productService.DeleteProduct(productId);

            return NoContent();
        }
    }
}
