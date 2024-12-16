/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
// import { useFileHandler } from "6pp";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { RootState } from "../../../redux/store";
import { responseToast } from "../../../utils/features";
import { Skeleton } from "../../../components/Loader";

const NewProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [sellingPrice, setSellingPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);

  const [description, setDescription] = useState<string>("");

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const useFileHandler = (maxFiles: number = 10, maxSizeMB: number = 5) => {
    const [files, setFiles] = useState<File[]>([]);
    const [preview, setPreview] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleFiles = (newFiles: FileList) => {
      setError(null); // Reset error state

      const validFiles: File[] = [];
      const previews: string[] = [];

      Array.from(newFiles).forEach((file) => {
        if (validFiles.length >= maxFiles) return;
        if (file.size <= maxSizeMB * 1024 * 1024) {
          validFiles.push(file);
          previews.push(URL.createObjectURL(file));
        } else {
          setError(`File ${file.name} exceeds the size limit of ${maxSizeMB} MB.`);
        }
      });

      setFiles((prev) => [...prev, ...validFiles]);
      setPreview((prev) => [...prev, ...previews]);
    };

    const removeFile = (index: number) => {
      setFiles((prev) => prev.filter((_, i) => i !== index));
      setPreview((prev) => prev.filter((_, i) => i !== index));
    };

    return { files, preview, handleFiles, removeFile, error };
  };
  const photos = useFileHandler(10, 5); // Use the custom hook for file handling



  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      if (!name || !price || stock < 0 || !category || !sellingPrice) return;

      if (!photos.files || photos.files.length === 0) return;

      const formData = new FormData();


      formData.set("name", name);
      formData.set("description", description);
      formData.set("price", price.toString());
      formData.set("sellingPrice", sellingPrice.toString());
      formData.set("stock", stock.toString());
      formData.set("category", category);

      photos.files.forEach((file) => {
        formData.append("photos", file);
      });

      const res = await newProduct({ id: user?._id!, formData });

      responseToast(res, navigate, "/admin/product");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <article>
            <form onSubmit={submitHandler}>
              <h2>New Product</h2>
              <div>
                <label>Name</label>
                <input
                  required
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label>Description</label>
                <textarea
                  required
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div>
                <label>Price</label>
                <input
                  required
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <div>
                <label>Selling Price</label>
                <input
                  required
                  type="number"
                  placeholder="Price"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Number(e.target.value))}
                />
              </div>
              <div>
                <label>Stock</label>
                <input
                  required
                  type="number"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                />
              </div>

              <div>
                <label>Category</label>
                <input
                  required
                  type="text"
                  placeholder="eg. laptop, camera etc"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div>
                <label>Photos</label>
                <input
                  required
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => photos.handleFiles(e.target.files!)}
                />
              </div>

              {photos.error && <p>{photos.error}</p>}

              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {photos.preview.map((img, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img
                      src={img}
                      alt={`Preview ${i + 1}`}
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                    <button
                      type="button"
                      style={{
                        position: "absolute",
                        top: "0px",
                        right: "5px",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={() => photos.removeFile(i)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <button disabled={isLoading} type="submit">
                Create
              </button>
            </form>
          </article>
        )}

      </main>
    </div>
  );
};

export default NewProduct;
