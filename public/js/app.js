const profileImg = document.querySelector('.profileImg');

async function deleteData(e, id) {
    console.log(e);
    const res = await fetch(`http://localhost:3000/edit/${id}`, {
        method: 'DELETE',
    });
    const result = await res.json();
    profileImg.src = `/uploads/${result.imgUrl}`;
    e.style.display = 'none';
    console.log(result);
}
