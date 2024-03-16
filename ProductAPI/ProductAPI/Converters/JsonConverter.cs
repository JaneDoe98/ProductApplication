using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using ProductAPI.Models;

namespace ProductAPI.Converters
{
    public static class JsonConverter
    {
        private static readonly string pathToJson = @"./Data/productData.json";

        public static List<Product> ReadJson()
        {
            string allProductRaw = File.ReadAllText(pathToJson);
            var allProduct = JsonConvert.DeserializeObject<List<Product>>(allProductRaw);
            return allProduct ?? new List<Product>();
        }

        public static void WriteJson(List<Product> productList)
        {
            string json = JsonConvert.SerializeObject(productList, new JsonSerializerSettings
            {
                ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new CamelCaseNamingStrategy()
                },
                Formatting = Formatting.Indented
            });
            File.WriteAllText(pathToJson, json);
        }
    }
}
