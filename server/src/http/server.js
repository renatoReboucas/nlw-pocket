"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const create_goal_1 = require("../functions/create-goal");
const zod_1 = __importDefault(require("zod"));
const app = (0, fastify_1.default)();
app.get('/ping', async () => {
    return { ping: 'pong' };
});
app.post('/goals', async (request) => {
    const creatGoalSchema = zod_1.default.object({
        title: zod_1.default.string(),
        desiredWeeklyFrequency: zod_1.default.number().int().min(1).max(7),
    });
    const body = creatGoalSchema.parse(request.body);
    await (0, create_goal_1.createGoal)({
        title: body.title,
        desiredWeeklyFrequency: body.desiredWeeklyFrequency,
    });
});
app
    .listen({
    port: 3333,
})
    .then(() => {
    console.log('🚀 Server is running on port 3333');
});
