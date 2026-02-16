const cloudname = "dc2w8vknn"
const preset = "presetEsmeralda"

const inputf = document.getElementById("fileinput")
const image = document.getElementById("imagen")

const subirimg = () => {
    const foto = inputf.files[0]

    const formdata = new FormData
    formdata.append('file', foto)
    formdata.append('upload_preset'.preset)

    fetch('https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload',
        {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok)
                throw new Error("Falta al Subir la imagen")
            return response.json
        })
        .then(data => {
            alert("Imagen subida con exito")
            image.src =data.secure_url
     })

}