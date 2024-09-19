import algoliasearch from 'algoliasearch';
import { ALGOLIA_APP_ID, ALGOLIA_WRITE_API_KEY, ALGOLIA_INDEX_NAME } from '@env';


const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_WRITE_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

// Función para agregar un producto al índice
export function addProductToAlgolia(product) {
    console.log(product);
  index.saveObject({
    objectID: product.objectID,  // Usa el ID único del producto como objectID si el ID existe solo actualiza
    titulo: product.titulo,
    detalles: product.description,
    costo: product.costo,
    category: product.category,
    autor: product.autor,
    total_views: product.total_views,
    image: product.image
  }).then(() => {
    console.log('Producto agregado al índice de Algolia');
  }).catch((error) => {
    console.error('Error al agregar el producto:', error);
  });
}


// Función para eliminar un producto del índice
export function removeProductFromAlgolia(productId) {
    index.deleteObject(productId).then(() => {
        console.log(`Producto con objectID ${productId} eliminado del índice de Algolia`);
    }).catch((error) => {
        console.error('Error al eliminar el producto:', error);
    });
}
