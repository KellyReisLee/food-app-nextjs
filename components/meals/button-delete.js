
'use client'
export default function ButtonDelete(id) {
  function deleteItem(id) {
    console.log(id);
  }

  return (
    <button onClick={deleteItem(id)}  >
      delete
    </button>
  );
}
