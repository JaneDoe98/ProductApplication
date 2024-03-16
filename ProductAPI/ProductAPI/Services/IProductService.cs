using ProductAPI.Models;

namespace ProductAPI.Services
{
    public interface IProductService
    {
        public List<Product> GetProductList();
        public Product? GetProduct(int id);
        public void CreateProduct(Product product);
        public void UpdateProduct(Product product);
        public void DeleteProduct(int id);
        public bool IsProductExists(int id);
    }
}
