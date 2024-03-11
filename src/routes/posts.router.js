import express from "express";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();

// 게시글 작성
router.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  const newpost = await prisma.Posts.create({
    data: {
      title,
      content,
    },
  });

  return res
    .status(201)
    .json({ id: newpost.id, title: newpost.title, content: newpost.content });
});

// 게시글 조회
router.get("/posts", async (req, res) => {
  const categorylist = await prisma.Posts.findMany({
    select: {
      id: true,
      title: true,
      content: true,
    },
  });

  return res.status(200).json(categorylist);
});

// 카테고리 정보 변경 API
router.put("/posts/:id", async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const updatedPost = await prisma.Posts.update({
    where: {
      id: +id,
    },
    data: {
      title,
      content,
    },
  });
  return res.json({ id: updatedPost.id, title: updatedPost.title, content: updatedPost.content });
});

// 카테고리 삭제 API
router.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  await prisma.Posts.delete({
    where: {
      id: +id,
    },
  });
  return res.status(200).json({ message: "석세스" });
});

export default router;
