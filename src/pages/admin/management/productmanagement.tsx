/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useFileHandler } from "6pp";
import { FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";

import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";
import { Skeleton } from "../../../components/Loader";

const Productmanagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);
  // console.log("Prdouctmngmnt --", data);

  const { price, photos, name, stock, category, description, sellingPrice } =
    data?.product || {
      photos: [],
      category: "",
      name: "",
      stock: 0,
      price: 0,
      description: "",
      sellingPrice: 0,
    };

  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [sellingPriceUpdate, setSellingPriceUpdate] =
    useState<number>(sellingPrice);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [descriptionUpdate, setDescriptionUpdate] =
    useState<string>(description);
  const [imageOrder, setImageOrder] = useState(photos);
  const [draggedIndex, setDraggedIndex] = useState(0);

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const photosFiles = useFileHandler("multiple", 10, 5);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBtnLoading(true);
    try {
      const formData = new FormData();

      formData.append("photosOrder", JSON.stringify(imageOrder));

      if (nameUpdate) formData.set("name", nameUpdate);
      if (descriptionUpdate) formData.set("description", descriptionUpdate);
      if (priceUpdate) formData.set("price", priceUpdate.toString());
      if (sellingPriceUpdate)
        formData.set("sellingPrice", sellingPriceUpdate.toString());
      if (stockUpdate !== undefined)
        formData.set("stock", stockUpdate.toString());

      if (categoryUpdate) formData.set("category", categoryUpdate);

      if (photosFiles.file && photosFiles.file.length > 0) {
        photosFiles.file.forEach((file) => {
          formData.append("photos", file);
        });
      }

      const res = await updateProduct({
        formData,
        userId: user?._id!,
        productId: data?.product._id!,
      });

      console.log(res);
      responseToast(res, navigate, "/admin/product");
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: data?.product._id!,
    });

    responseToast(res, navigate, "/admin/product");
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setSellingPriceUpdate(data.product.sellingPrice);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
      setDescriptionUpdate(data.product.description);
      setImageOrder(data.product.photos);
    }
  }, [data]);

  if (isError) return <Navigate to={"/404"} />;

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnter = (index: number) => {
    // Rearrange images as they are dragged over each other
    const newOrder = [...imageOrder];
    const [movedImage] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(index, 0, movedImage);
    setDraggedIndex(index);
    setImageOrder(newOrder);
  };

  const handleDrop = async () => {
    setDraggedIndex(-1);
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section>
              <strong>ID - {data?.product._id}</strong>
              <div className="grid grid-cols-3 gap-4">
                {imageOrder.map((photo, index) => (
                  <img
                    key={photo.url}
                    src={photo.url}
                    alt={`Product ${index + 1}`}
                    className="w-full h-auto cursor-move"
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDrop}
                  />
                ))}
              </div>

              {/* <img src={transformImage(photos[0]?.url)} alt="Product" /> */}
              <p>{name}</p>
              {stock > 0 ? (
                <span className="green">{stock} Available</span>
              ) : (
                <span className="red"> Not Available</span>
              )}
              <h3>₹{sellingPrice}</h3>
            </section>
            <article>
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <form onSubmit={submitHandler}>
                <h2>Manage</h2>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                  />
                </div>

                <div>
                  <label>Description</label>
                  <textarea
                    required
                    placeholder="Description"
                    value={descriptionUpdate}
                    onChange={(e) => setDescriptionUpdate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label>Selling Price</label>
                  <input
                    type="number"
                    placeholder="Selling Price"
                    value={sellingPriceUpdate}
                    onChange={(e) =>
                      setSellingPriceUpdate(Number(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label>Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label>Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                  />
                </div>

                <div>
                  <label>Photos</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={photosFiles.changeHandler}
                  />
                </div>

                {photosFiles.error && <p>{photosFiles.error}</p>}

                {photosFiles.preview && (
                  <div
                    style={{ display: "flex", gap: "1rem", overflowX: "auto" }}
                  >
                    {photosFiles.preview.map((img, i) => (
                      <img
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                        key={i}
                        src={img}
                        alt="New Image"
                      />
                    ))}
                  </div>
                )}

                <button disabled={btnLoading} type="submit">
                  Update
                </button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default Productmanagement;
