import { Pais } from "../../Model/PaisModel.js";

// Mostrar Pais

export const mostrar = async (req,res) =>{
    try{
        const pais = await Pais.findAll({
            attributes:["id", "pais", "activo"]
        });
        if(!pais.length){
            return res.status(404).json('no existen datos del pais');
        }
        else{
            return res.status(200).json(pais);
        }
    } catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
}

// Crear Pais

export const crear = async (req,res) =>{
    try{
        const paisBuscar = await Pais.findOne({where:{pais:req.body.pais}});
        if(paisBuscar === null){
            const pais = Pais.create({
                pais:req.body.pais,
                activo:1
            });
            return res.status(200).json({
                message:'¡Pais agregado!'
            });
        }
        else{
            return res.status(302).json({
                message:"Pais existente"
            });
        }
    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
}

// Buscar por id

export const buscarPorId = async(req,res) =>{
    try{
        const pais = await Pais.findByPk(req.params.id);
        if(!pais){
            return res.status(404).json({
                message:'No existe el pais'
            });
        }
        else{
            return res.status(200).json({
                informacion:pais
            });
        }
    }catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
}

// Actualizar pais

export const actualizar = async(req,res) =>{
    try{
        const paisBuscar = await Pais.findByPk(req.params.id);
        if(!paisBuscar){
            return res.status(404).json({
                message:'No existe el pais'
            });
        }
        else{
            const paisActualizar = await Pais.update(
                {pais:req.body.pais},
                {where:{id:req.params.id}});
            return res.status(200).json({message:"Pais Actualizado"});
        }
    } catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
}


// Inhabilitar pais

export const inhabilitar = async(req,res) =>{
    try{
        const paisBuscar = await Pais.findByPk(req.params.id);
        if(!paisBuscar){
            return res.status(404).json({
                message:'No existe el pais'
            });
        }
        else{
            const paisActualizar = await Pais.update(
                {activo:0},
                {where:{id:req.params.id}});
                return res.status(200).json({message:"Pais inhabilitado"});
        }
    } catch(error){
        return res.status(500).json({
            message:error.message
        });
    }
}