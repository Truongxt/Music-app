import Album from "../models/Album.js";

export const add = async (req, res) => {};

export const update = async (req, res) => {};

export const findById = async (req, res) => {
  
};

export const findByArtist = async (req, res) => {
    const { id } = req.params;
    try{
        const albums = await Album.find({artist: id}).populate("artist", "name");

        return res.status(200).json(albums);
    }catch(err){
        console.log("Lỗi khi find album by artist");
        return res.status(500).json({"message": "Lỗi khi find album by artist"});
    }
}

export const findByName = async (req, res) => {};

export const del = async (req, res) => {};

export const findAll = async (req, res) => {
 const albums = await Album.find().populate("artist", "name");

 return res.json(albums);
};
