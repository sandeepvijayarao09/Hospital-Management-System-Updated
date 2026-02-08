import { Request, Response } from 'express';
import { Model, Document } from 'mongoose';

export class BaseController<T extends Document> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
        // Bind methods to instance to allow passing as callbacks
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    protected handleError(res: Response, error: any, message: string = 'Server Error', statusCode: number = 500) {
        res.status(statusCode).json({ message, error });
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const items = await this.model.find();
            res.json(items);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const item = await this.model.findById(req.params.id);
            if (!item) {
                res.status(404).json({ message: 'Item not found' });
                return;
            }
            res.json(item);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const newItem = new this.model(req.body);
            const savedItem = await newItem.save();
            res.status(201).json(savedItem);
        } catch (error) {
            this.handleError(res, error, 'Error creating item', 400);
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const item = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!item) {
                res.status(404).json({ message: 'Item not found' });
                return;
            }
            res.json(item);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const item = await this.model.findByIdAndDelete(req.params.id);
            if (!item) {
                res.status(404).json({ message: 'Item not found' });
                return;
            }
            res.json({ message: 'Item deleted' });
        } catch (error) {
            this.handleError(res, error);
        }
    }
}
