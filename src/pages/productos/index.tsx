import { useEffect, useState } from 'react';
import { PageBreadcrumb } from '@/components';
import { Card, Col, Row, Form, InputGroup } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import ProductModal from './productmodal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Definir el tipo para los productos
interface Product {
	_id: string;
	name: string;
	category: string;
	cost: number;
	rating: number;
	image: string;
}

const CardWithImage3 = ({ product, onDelete }: { product: Product; onDelete: (name: string) => void }) => {
	return (
		<Card className="d-block">
			<Card.Img className="card-img-top" src={product.image} alt={product.name} />
			<Card.Body>
				<Card.Title>{product.name}</Card.Title>
				<Card.Text>
					Category: {product.category}
					<br />
					Cost: ${product.cost}
					<br />
					Rating: {product.rating} stars
				</Card.Text>
				<button
					className="btn btn-primary"
					onClick={() => onDelete(product.name)} // Pasamos el name del producto
				>
					Eliminar
				</button>
			</Card.Body>
		</Card>
	);
};

const Productos = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [searchTerm, setSearchTerm] = useState('');

	// Obtener los productos al montar el componente
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				//const response = await fetch('http://majoback25-production.up.railway.app/api/v1/products');
				const response = await fetch('https://server25x.veaquesi.ovh:8082/api/v1/products');
				const data = await response.json();
				setProducts(data);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};

		fetchProducts();
	}, []);

	// Manejar eliminación de productos
	const handleDelete = async (name: string) => {
		try {
			//const response = await fetch(`https://majoback25-production.up.railway.app/api/v1/deleteProduct`, {
			const response = await fetch(`https://server25x.veaquesi.ovh:8082/api/v1/deleteProduct`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name }), // Enviamos el campo `name`
			});

			if (!response.ok) {
				const errorData = await response.json();
				toast.error(`Error: ${errorData.error}`); // Mostrar error en caso de fallo
				return;
			}

			// Actualizar el estado para eliminar el producto visualmente
			setProducts(products.filter(product => product.name !== name));
			toast.success('Producto eliminado con éxito'); // Mostrar notificación de éxito
		} catch (error) {
			console.error('Error deleting product:', error);
			toast.error('Error al eliminar el producto'); // Mostrar error en caso de fallo
		}
	};

	// Filtrar productos por nombre
	const filteredProducts = products.filter(product =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<PageBreadcrumb title="Productos" subName="Pages" />

			<ProductModal />

			<Form>
				<InputGroup className="mb-3">
					<Form.Control
						type="text"
						placeholder="Buscar productos..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</InputGroup>
			</Form>

			<Row>
				{filteredProducts.map(product => (
					<Col sm={6} lg={3} key={product._id}>
						<CardWithImage3 product={product} onDelete={handleDelete} />
					</Col>
				))}
			</Row>

			{/* Contenedor para las notificaciones */}
			<ToastContainer />
		</>
	);
};

export default Productos;
