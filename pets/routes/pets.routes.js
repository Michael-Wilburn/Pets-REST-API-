import express from 'express';
import {
  listPets,
  getPet,
  editPet,
  addPet,
  deletePet,
} from '../controllers/pets.controllers.js';

const router = express.Router();

router.get('/', listPets);

router.get('/:id', getPet);

router.put('/:id', editPet);

router.post('/', addPet);

router.delete('/:id', deletePet);

export default router;
