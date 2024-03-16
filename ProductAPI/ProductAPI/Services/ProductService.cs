using ProductAPI.Converters;
using ProductAPI.Models;

namespace ProductAPI.Services
{
    public class ProductService : IProductService
    {
        public List<Product> GetProductList()
        {
            var allProduct = JsonConverter.ReadJson();

            return allProduct;
        }

        public Product GetProduct(int id)
        {
            var allProduct = JsonConverter.ReadJson();

            var productToView = allProduct.Where(x => x.Id == id).Single();

            return productToView;
        }

        public void CreateProduct(Product product)
        {
            var allProduct = JsonConverter.ReadJson();

            allProduct.Add(product);

            JsonConverter.WriteJson(allProduct);
        }

        public void UpdateProduct(Product product)
        {
            var allProduct = JsonConverter.ReadJson();

            var productToEdit = allProduct.Where(x => x.Id == product.Id).Single();
            allProduct.Remove(productToEdit);

            allProduct.Add(product);

            JsonConverter.WriteJson(allProduct);
        }

        public void DeleteProduct(int id)
        {
            var allProduct = JsonConverter.ReadJson();

            var productToDelete = allProduct.Where(x => x.Id == id).Single();
            allProduct.Remove(productToDelete);

            JsonConverter.WriteJson(allProduct);
        }

        public bool IsProductExists(int id)
        {
            var allProduct = JsonConverter.ReadJson();

            return allProduct.Any(x => x.Id == id);
        }
    }
}
