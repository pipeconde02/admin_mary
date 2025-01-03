import React, { useState } from 'react'
import { Modal, Button, Card } from 'react-bootstrap'
import { toast } from 'react-toastify'  // Necesitarás instalar react-toastify si no lo tienes

const ProductModal = () => {
  const [showModal, setShowModal] = useState(false)
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [cost, setCost] = useState('')
  const [rating, setRating] = useState('')
  const [image, setImage] = useState('')

  const toggleModal = () => setShowModal(!showModal)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newProduct = {
      name: productName,
      category,
      cost: parseInt(cost), // aseguramos que sea un número entero
      rating: parseFloat(rating), // aseguramos que sea un número decimal
      image,
    }

    try {
      //const response = await fetch('https://majoback25-production.up.railway.app/api/v1/newproduct', {
        const response = await fetch('https://server25x.veaquesi.ovh:8082/api/v1/newproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      })

      if (response.ok) {
        toast.success('Producto creado con éxito')  // Notificación de éxito
        setShowModal(false)
      } else {
        toast.error('Error al crear el producto')  // Notificación de error
      }
    } catch (error) {
      toast.error('Error de conexión')  // Notificación de error
    }
  }

  return (
    <Card>
      <Card.Header>
        <h4 className="header-title">Agregar Producto</h4>
      </Card.Header>
      <Card.Body>
        <Button variant="primary" onClick={toggleModal}>
          Nuevo
        </Button>

        <Modal show={showModal} onHide={toggleModal}>
          <Modal.Body>
            <h5 className="text-center mb-4">Add Product Details</h5>
            <form className="ps-3 pe-3" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                  Nombre
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  placeholder="Product Name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Categoria
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  placeholder="Product Category"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="cost" className="form-label">
                  Valor COP
                </label>
                <input
                  className="form-control"
                  type="number"
                  id="cost"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  required
                  placeholder="Product Cost"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="rating" className="form-label">
                  Rating
                </label>
                <input
                  className="form-control"
                  type="number"
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                  placeholder="Product Rating (1-5)"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image URL
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                  placeholder="Product Image URL"
                />
              </div>

              <div className="mb-3 text-center">
                <Button variant="primary" type="submit">
                  Agregar
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  )
}

export default ProductModal
