// import Model patient
const Patient = require("../models/patient");

// Membuat parrent file Controller
const Controller = require("./Controller");

// buat child class patientController
class PatientController extends Controller {
  // buat fungsi
  async index(req, res) {
    const patient = await Patient.all();

    if (patient) {
      const data = {
        message: "Menampilkan Data Semua patients",
        data: patient,
      };

      return res.status(200).json(data);

      // this.response(200, "Successfully Get Patients Data", patient);
    } else {
      const data = {
        message: "patient Not Found",
      };

      return res.status(404).json(data);
    }
  }

  async store(req, res) {
    const { name, phone, address, status } = req.body;

    if (!name || !phone || !address || !status) {
      const data = {
        message: `Semua data harus dikirim`,
      };

      return res.status(201).json(data);
    }

    const value = {
      name: name,
      phone: phone,
      address: address,
      status: status,
    };

    const patient = await Patient.create(value);

    const data = {
      message: `Menambahkan patients ${patient}`,
      data: patient,
    };

    res.status(201).json(data);
  }

  async update(req, res) {
    const { id } = req.params;
    const patient = Patient.find(id);

    if (patient) {
      const patient = await Patient.update(id, req.body);
      const data = {
        message: `Mengedit Data patients`,
        data: patient,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `patient Not Found`,
      };

      res.status(404).json(data);
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      await Patient.delete(id);
      const data = {
        message: `Menghapus Data patients`,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `patient Not Found`,
      };

      res.status(404).json(data);
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      const data = {
        message: `Menampilkan Data patient`,
        data: patient,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `patient Not Found`,
      };
      res.status(200).json(data);
    }
  }

  async search(req, res) {
    const { name } = req.params;
    const patient = await Patient.search(name);

    if (patient) {
      const data = {
        message: `Menampilkan Data Patient`,
        data: patient,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Patient Not Found`,
      };

      res.status(200).json(data);
    }
  }

  async positive(req, res) {

    const patient = await Patient.findByStatus('positive');

    if (patient) {
      const data = {
        message: `Menampilkan Data Patient`,
        data: patient,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Patient Not Found`,
      };

      res.status(200).json(data);
    }
  }

  async recovered(req, res) {

    const patient = await Patient.findByStatus('negative');

    if (patient) {
      const data = {
        message: `Menampilkan Data Patient`,
        data: patient,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Patient Not Found`,
      };

      res.status(200).json(data);
    }
  }

  async dead(req, res) {
    const { status } = req.params;
    const patient = await Patient.findByStatus('dead');

    if (patient) {
      const data = {
        message: `Menampilkan Data Patient`,
        data: patient,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Patient Not Found`,
      };

      res.status(200).json(data);
    }
  }
}

// membuat object patientController
const object = new PatientController();

// export object patientController
module.exports = object;
