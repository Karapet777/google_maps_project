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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantEntity = void 0;
const typeorm_1 = require("typeorm");
const comment_entity_1 = require("./comment.entity");
const restaurant_rate_entity_1 = require("./restaurant-rate.entity");
let RestaurantEntity = class RestaurantEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RestaurantEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], RestaurantEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RestaurantEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 'https://media-cdn.tripadvisor.com/media/photo-s/1a/24/28/75/table-for-family-dinner.jpg',
    }),
    __metadata("design:type", String)
], RestaurantEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326,
        nullable: true,
    }),
    __metadata("design:type", Object)
], RestaurantEntity.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision', default: 0 }),
    __metadata("design:type", Number)
], RestaurantEntity.prototype, "averageRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], RestaurantEntity.prototype, "rateCount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.CommentEntity, (commentEntity) => commentEntity.restaurant),
    __metadata("design:type", Array)
], RestaurantEntity.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => restaurant_rate_entity_1.RestaurantRateEntity, (restaurantRateEntity) => restaurantRateEntity.restaurant),
    __metadata("design:type", Array)
], RestaurantEntity.prototype, "rates", void 0);
RestaurantEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'restaurant' })
], RestaurantEntity);
exports.RestaurantEntity = RestaurantEntity;
//# sourceMappingURL=restaurant.entity.js.map