"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const restaurant_entity_1 = require("./restaurant.entity");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./comment.entity");
const restaurant_rate_entity_1 = require("./restaurant-rate.entity");
const restaurant_1 = require("../seed/restaurant");
let RestaurantService = class RestaurantService {
    constructor(restaurantRepository, restaurantRateRepository, commentRepository) {
        this.restaurantRepository = restaurantRepository;
        this.restaurantRateRepository = restaurantRateRepository;
        this.commentRepository = commentRepository;
        new restaurant_1.RestaurantSeed(this.restaurantRepository, this.restaurantRateRepository, this.commentRepository);
    }
    async getAll() {
        return this.restaurantRepository.createQueryBuilder('restaurant').getMany();
    }
    async getById(restaurantId) {
        return this.restaurantRepository
            .createQueryBuilder('restaurant')
            .leftJoinAndSelect('restaurant.comments', 'comments')
            .where('restaurant.id = :restaurantId', { restaurantId })
            .getOne();
    }
    async createComment(restaurantId, createCommentDto) {
        const restaurant = await this.getById(restaurantId);
        if (!restaurant) {
            throw new Error('Restaurant not found');
        }
        const commentEntity = this.commentRepository.create({
            restaurant: restaurant,
            username: createCommentDto.username,
            comment: createCommentDto.comment,
        });
        await this.commentRepository.save(commentEntity);
        return commentEntity;
    }
    async calculateRate(restaurantId) {
        const restaurant = await this.restaurantRepository
            .createQueryBuilder('restaurant')
            .leftJoinAndSelect('restaurant.rates', 'rates')
            .leftJoinAndSelect('restaurant.comments', 'comments')
            .where('restaurant.id = :restaurantId', {
            restaurantId,
        })
            .getOne();
        let averageRate = 0;
        for (const rate of restaurant.rates) {
            averageRate += rate.value;
        }
        restaurant.averageRate = averageRate;
        restaurant.rateCount = restaurant.rates.length;
        return this.restaurantRepository.save(restaurant);
    }
    async rateRestaurant(rateRestaurantDto) {
        const restaurant = await this.restaurantRepository
            .createQueryBuilder('restaurant')
            .where('restaurant.id = :restaurantId', {
            restaurantId: rateRestaurantDto.restaurantId,
        })
            .getOne();
        if (!restaurant) {
            throw new Error('Restaurant not found');
        }
        const restaurantRateEntity = this.restaurantRateRepository.create(rateRestaurantDto);
        await this.restaurantRateRepository.save(restaurantRateEntity);
        return this.calculateRate(rateRestaurantDto.restaurantId);
    }
};
RestaurantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_entity_1.RestaurantEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(restaurant_rate_entity_1.RestaurantRateEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(comment_entity_1.CommentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RestaurantService);
exports.RestaurantService = RestaurantService;
//# sourceMappingURL=restaurant.service.js.map