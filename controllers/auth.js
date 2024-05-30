import { User } from '../models/user.js'
import { mongoose } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const login = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) return res.status(404).json({ status: 'error', message: 'utente/password errata' })

    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            }, process.env.JWT_SECRET
        )
        return res.json({ status: 'ok', data: token })
    }

    res.status(401).json({ status: 'error', message: 'utente/password errata' })
}

export const register = async (req, res) => {
    const { username, password } = req.body

    if (!username || typeof username != 'string') {
        return res.json({ status: 'error', message: 'username non valido' })
    }
    if (!password || typeof password != 'string') {
        return res.json({ status: 'error', message: 'password non valida' })
    }

    if (password.length < 5) {
        return res.json({ status: 'error', message: 'password troppo corta' })
    }

    const passwordHashed = await bcrypt.hash(password, 10)
    const user = new User({
        username: username, password: passwordHashed
    })

    try {
        await user.save({ status: 'ok' })

        res.status(201).json()
    } catch (error) {
        res.status(409).json({ status: 'error', message: error.message })
    }

}