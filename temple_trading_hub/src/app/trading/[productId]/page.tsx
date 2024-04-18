'use client';
import { useEffect, useState } from 'react';
import { db } from '@firebase';
import { doc, getDoc } from 'firebase/firestore';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Container} from '@mui/material';
import { UserAuth } from '@context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ProductPage = ({ params }: any) => {
  const { user } = UserAuth();
  const [product, setProduct] = useState();
  const { productId }: any = params;

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        const docRef = doc(db, 'listings', productId);
        const docSnap: any = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log('Product not found');
        }
      }
    };

    fetchProduct();
  }, []);
  const router = useRouter();
  const routeToEdit = (product: any) => {
    
    router.push("/trading/edit");
  }

  return (
    <Container maxWidth='lg' sx={{ padding: '30px' }}>
      {/* <Card
        variant='outlined'
        sx={(theme) => ({
          backgroundSize: 'cover',
          outline: '1px solid',
          outlineColor:
            theme.palette.mode === 'light'
              ? alpha('#d9bfbf', 0.5)
              : alpha('#fc9c9c', 0.1),
        })}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: '#A31F37', color: 'white' }}
              aria-label='user'>
              {product && product.userEmail[0]}
            </Avatar>
          }
          title={product && product.userEmail}
        />
        {product && product.imageUrl && (
          <CardMedia
            component='img'
            image={product && product.imageUrl}
            alt={product && product.image}
          />
        )}
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {product && product.description}
          </Typography>
        </CardContent>
      </Card> */}
      <Card>
        {product && //@ts-ignore
        product.imageUrl && (
          <CardMedia
            component='img'
            image={product && //@ts-ignore
              product.imageUrl}
            alt={product && //@ts-ignore
            product.image}
          />
        )}
        <CardContent>
          <Typography variant='h2' color='text.secondary'>
            {product && //@ts-ignore
            product.title}
          </Typography>
          <Typography variant='h6' color='text.secondary'>
            Description: {product && 
            //@ts-ignore 
            product.description}
          </Typography>
          <Typography variant='h6' color='text.secondary'>
            
            Price: {product && //@ts-ignore 
            product.price}
          </Typography>
          <Button
            sx={{ marginTop: 2 }}
            color='primary'
            variant='contained'
            fullWidth
            //@ts-ignore
            href={`mailto:${product && product.userEmail}`}>
            Contact User
          </Button>
          
          {user && product && (user.uid === product.userID) ? (
          <Link
          href={{
            pathname: '../trading/edit/',
            query: {id: productId,
            }
          }}
        >
          Edit Trade
        </Link>
        ): null}
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductPage;
