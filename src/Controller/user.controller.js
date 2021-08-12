import { response } from 'express'
import {pool} from '../database'
const helpers = require('../libs/helpers');
export const readAllUsers = async(req , res ) => {
    try {
        const response = await pool.query('select * from usuario');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error...');
    }
}

export const readUser = async (req , res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select * from usuario where idusuario=$1' ,[id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error...');
    }

}

export const delUser = async (req , res) => {
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('delete from usuario where idusuario=$1', [id]);
        return res.status(200).json(
        `El Usuario ${id} ha sido eliminado correctamente...!`
        );

    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error...');
    }

}

export const updateUser = async(req, res)=>{
    try {
   
        const{ idempleado ,username, password  , idrol } = req.body;
        const password2 = await helpers.encryptPassword(password);
        await pool.query('update usuario set username=$1 , password=$2, idrol=$3 , iddocente=$4  where idusuario=$5', [idempleado ,username, password2 , idrol , iddocente, id]);
        return res.status(200).json(
            `El Usuario  ${ username } ha sido modificado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

export const createUser = async(req, res)=>{
    try {
        const{ username, password , idrol,iddocente} = req.body;
        await pool.query('insert into usuario( username, password, idrol , iddocente , estado) values($1,$2, $3,$4, 1)', [idempleado ,username, password ,idrol , iddocente]);
        return res.status(200).json(
            `El Usuario  ${ username } ha sido creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}