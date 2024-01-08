function toggleFormulario() {
    var formulario = document.getElementById("formulario");
    if (formulario.style.display === "none") {
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
    }
}
//form
function submitForm() {
	var form = document.querySelector('#form-registrar');
	var formData = new FormData(form);

	for(var pair of formData.entries()) {
		console.log(pair[0] + ': ' + pair[1]);
	}

	fetch('api/registro', {
		method: 'POST',
		body: formData
	})
	.then(response => response.json())
	.then(data => {
		console.log('Success:', data);
	})
	.catch((error) => {
		console.error('Error:', error);
	});
}
app.post('/api/registro', (req, res) => {
	const data = req.body;

	const mailOptions = {
		from: 'qregalos001@gmail.com',
		to: data.email,
		subject: 'Información del registro del evento',
		text: JSON.stringify(data)
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.status(200).send('Correo enviado');
		}
	});
});

