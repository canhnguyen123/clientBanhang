import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function ItemBoxTheLoai({ linkImg, titel,id}) {
  return (
    <div className="flex_center">
      <Card className='card-theloai' >
        <Card.Img className='card-theloai-img' src={linkImg} />
        <Card.Body>
          <Card.Title className='box-titel'>{titel}</Card.Title>
          <div className='see-more flex_center'>
               <a className='see-more-text' >Xem thêm <i class="fa-solid fa-angles-right"></i></a>
          </div>
        
        </Card.Body>
      </Card>
    </div>
  );
}

export default ItemBoxTheLoai;