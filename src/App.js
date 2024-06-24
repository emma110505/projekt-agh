import { Pencil, Plus, Trash } from "lucide-react";
import "./App.css";
import {
  useAddAuthor,
  useDeleteAuthor,
  useFetchAuthors,
  useUpdateAuthor,
} from "./hooks/useAuthors";
import { useState } from "react";

function App() {
  const { authors, loading, refetch } = useFetchAuthors();
  const { addAuthor } = useAddAuthor();
  const { deleteAuthor } = useDeleteAuthor();
  const { updateAuthor } = useUpdateAuthor();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editAuthor, setEditAuthor] = useState({
    id: "",
    name: "",
    surname: "",
  });

  const [newAuthor, setNewAuthor] = useState({ name: "", surname: "" });

  const handleOpenEditModal = (author) => {
    setEditAuthor(author);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleAddAuthor = async () => {
    await addAuthor(newAuthor);
    setNewAuthor({ name: "", surname: "" });
    refetch();
  };

  const handleDeleteAuthor = async (id) => {
    await deleteAuthor(id);
    refetch();
  };

  const handleUpdateAuthor = async () => {
    await updateAuthor(editAuthor.id, editAuthor);
    setEditAuthor({ id: "", name: "", surname: "" });
    handleCloseEditModal();
    refetch();
  };
  return (
    <div className="wrapper">
      <header>
        <h1>Authors</h1>
      </header>
      <div className="content">
        <div className="form-wrapper">
          <h2>Add new author</h2>
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newAuthor.name}
                onChange={(e) =>
                  setNewAuthor({ ...newAuthor, name: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="surname">Surname</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={newAuthor.surname}
                onChange={(e) =>
                  setNewAuthor({ ...newAuthor, surname: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="button-icon"
              disabled={
                loading || newAuthor.name === "" || newAuthor.surname === ""
              }
              onClick={handleAddAuthor}
            >
              <Plus size={16} />
              Add author
            </button>
          </form>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.length === 0 && (
              <tr>
                <td colSpan={3} align="center">
                  No authors found
                </td>
              </tr>
            )}
            {authors.length > 0 &&
              authors.map((author) => (
                <tr key={author.id}>
                  <td>{author.name}</td>
                  <td>{author.surname}</td>
                  <td>
                    <div className="actions">
                      <button
                        type="button"
                        className="button-icon"
                        onClick={() => handleOpenEditModal(author)}
                      >
                        <Pencil size={16} />
                        Edit
                      </button>
                      <button
                        type="button"
                        className="button-icon destructive"
                        onClick={() => handleDeleteAuthor(author.id)}
                      >
                        <Trash size={16} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseEditModal}>
              &times;
            </span>
            <div className="modal-form">
              <h2>Edit Author</h2>
              <div className="form-input">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={editAuthor.name}
                  placeholder="Name"
                  onChange={(e) =>
                    setEditAuthor({ ...editAuthor, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  id="surname"
                  value={editAuthor.surname}
                  placeholder="Surname"
                  onChange={(e) =>
                    setEditAuthor({ ...editAuthor, surname: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleUpdateAuthor}
                disabled={
                  loading || editAuthor.name === "" || editAuthor.surname === ""
                }
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
