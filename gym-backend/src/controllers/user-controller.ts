import { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import { saltRounds } from '../app';
import { addMonths } from 'date-fns';
import bcrypt from 'bcrypt';
import { signToken } from '../utils/jwt';
import { login } from '../services/userService';

export async function addMember(req: Request, res: Response) {
  try {
    const { name, id, password, phone } = req.body;
    const hashed = await bcrypt.hash(password, saltRounds);
    const joinDate = new Date();
    const expireDate = addMonths(joinDate, 1);
    const add = await prisma.member.create({
      data: {
        name,
        id,
        password: hashed,
        phone,
        expireDate,
      },
    });
    res.status(201).json({ add });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function loginMember(req: Request, res: Response) {
  try {
    const { id, password } = req.body;
    const loggedInMember = await login(id, password);
    res.status(200).json({ message: 'Login successfully', loggedInMember });
    // const user = await prisma.member.findUnique({
    //   where: { id: memberId },
    // });
    // if (!user) {
    //   res.status(404).json({ message: 'Member tidak ada' });
    //   return;
    // }
    // const isValid = await bcrypt.compare(password, user?.password);
    // if (!isValid) {
    //   res.status(400).json({ message: 'Password salah' });
    //   return;
    // }
    // const token = signToken({id : user.id, expireDate: user.expireDate})
    // res.status(200).json({ message: 'Login successfully', user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAllMember(req: Request, res: Response) {
  try {
    const members = await prisma.member.findMany({
      omit: {
        joinDate: true,
        updatedAt: true,
        password: true,
        role: true,
      },
    });
    res.status(200).json(members);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
export async function getMember(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const member = await prisma.member.findUnique({
      where: { id },
      omit: {
        password: true,
        updatedAt: true,
        joinDate: true,
      },
    });
    res.status(200).json(member);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function editMember(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const image = req.file?.path;
    const { password, phone, name } = req.body;
    const dataToUpdate: Record<string, any> = {};
    if (name) dataToUpdate.name = name;
    if (phone) dataToUpdate.phone = phone;
    if (password) {
      const hashed = await bcrypt.hash(password, saltRounds);
      dataToUpdate.password = hashed;
    }
    const edit = await prisma.member.update({
      where: { id },
      data: dataToUpdate,
    });
    res.status(201).json({ message: 'Member edit successfully', edit });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function recordVisit(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const alreadyVisit = await prisma.visit.findFirst({
      where: {
        memberId: id,
        visitedAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });
    if (alreadyVisit) {
      res.status(200).json({ alreadyVisit });
    } else {
      const visit = await prisma.visit.create({
        data: {
          memberId: id,
        },
      });
      res.status(201).json(visit);
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getTodayVisit(req: Request, res: Response) {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const allVisit = await prisma.visit.findMany({
      where: {
        visitedAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });
    res.status(200).json(allVisit);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
