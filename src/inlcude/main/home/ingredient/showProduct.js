import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ItemProduct from "../../../component/itemBoxProduct"
function ShowProduct(props) {
    const { id, titel, productList } = props;
    return (
        <div className='theloai-item-box' data-id={id}>
            <h3>{titel}</h3>
            <div className='list-product w-1200 pd-30'>
                    {productList.map(product=>
                         <ItemProduct
                          product_id={product.product_id}
                          name={product.product_name}
                          link={product.product_img} 
                          price={product.product_price}
                           />
                      )}
                
            </div>
        </div>

    );
}

export default ShowProduct;