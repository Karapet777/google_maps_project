"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantSeed = void 0;
class RestaurantSeed {
    constructor(restaurantRepository, restaurantRateRepository, commentRepository) {
        this.locations = [
            {
                type: 'Point',
                coordinates: [40.1783449, 44.5110099],
            },
            {
                type: 'Point',
                coordinates: [40.1944274, 44.4817237],
            },
            {
                type: 'Point',
                coordinates: [40.1806302, 44.5157911],
            },
            {
                type: 'Point',
                coordinates: [40.226324334348746, 44.45244184050413],
            },
            {
                type: 'Point',
                coordinates: [40.19523296967873, 44.54655109817463],
            },
            {
                type: 'Point',
                coordinates: [40.183994182559346, 44.51658619933652],
            },
            {
                type: 'Point',
                coordinates: [40.184485316045986, 44.50139416698813],
            },
            {
                type: 'Point',
                coordinates: [40.186063806121126, 44.50778718283207],
            },
            {
                type: 'Point',
                coordinates: [40.181136230270766, 44.51549542885968],
            },
            {
                type: 'Point',
                coordinates: [40.184589713159696, 44.5104218270102],
            },
        ];
        this.restaurants = [
            {
                id: 1,
                name: 'Պանդոկ Երևան',
                location: this.locations[0],
                image: 'https://pandokyerevan.com/application/themes/frontend/default/img_corp/khorenatsi1.jpg',
                averageRate: 1,
                rateCount: 2,
            },
            {
                id: 2,
                name: 'Florence Restaurant',
                location: this.locations[1],
                image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/54/5d/91/florence-restaurant.jpg?w=800&h=600&s=1',
                averageRate: 2,
                rateCount: 2,
            },
            {
                id: 3,
                name: 'Dolmama Restaurant',
                location: this.locations[2],
                image: 'https://cdn.tasteatlas.com/images/restaurants/5bdfdf1b419146b7a8d3920edebf97c7.jpg?w=600&h=450',
                averageRate: 3,
                rateCount: 2,
            },
            {
                id: 4,
                name: 'Ureni  Restaurant',
                location: this.locations[3],
                image: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/321346034.jpg?k=da06a39294a5b8fb88ef7f7e3e802357ca2977bc9c4ebef52b93ec7cdb7aedc5&o=&hp=1',
                averageRate: 4,
                rateCount: 2,
            },
            {
                id: 5,
                name: 'Իբիցա հյուրանոց և սաունա',
                location: this.locations[4],
                image: 'https://old.yerkirmedia.am/wp-content/uploads/2018/09/ibiza-1.jpg',
                averageRate: 5,
                rateCount: 2,
            },
            {
                id: 6,
                name: 'Թումանյան Շաուրմա',
                location: this.locations[5],
                image: 'https://www.tshaurma.com/bitrix/templates/tumanyan/images/buffet/tumanyan/5.jpg',
                averageRate: 1,
                rateCount: 2,
            },
            {
                id: 7,
                name: 'ԴՎԻՆ Ռեստորանային համալիր',
                location: this.locations[6],
                image: 'https://lh5.googleusercontent.com/p/AF1QipMp1xi_kI98Ie1LI0frU6squcekRsQKMPSOB3uQ=w426-h240-k-no',
                averageRate: 2,
                rateCount: 2,
            },
            {
                id: 8,
                name: 'Smoking Chef',
                location: this.locations[7],
                image: 'https://lh5.googleusercontent.com/p/AF1QipO80hYPxDSABsR1djh63-esAjQIqnip5iVghXzh=w408-h271-k-no',
                averageRate: 3,
                rateCount: 2,
            },
            {
                id: 9,
                name: 'Malkhas Jazz Club',
                location: this.locations[9],
                image: 'https://lh5.googleusercontent.com/p/AF1QipOUgwMOyb-lvHYankm36h9QpSMgqu1mArGxFlJH=w408-h544-k-no',
                averageRate: 4,
                rateCount: 2,
            },
            {
                id: 10,
                name: 'Paparazzi Club',
                location: this.locations[8],
                image: 'https://lh5.googleusercontent.com/p/AF1QipOidw0IAhBbpP1Opc50QFZQUmZjTffJdvhOK98S=w649-h240-k-no',
                averageRate: 5,
                rateCount: 2,
            },
        ];
        this.restaurantRepository = restaurantRepository;
        this.restaurantRateRepository = restaurantRateRepository;
        this.commentRepository = commentRepository;
        this.check();
    }
    async check() {
        const restaurants = await this.restaurantRepository.find();
        if (restaurants.length === 0) {
            await this.add();
        }
    }
    async add() {
        const rests = [];
        for (const r of this.restaurants) {
            rests.push(this.restaurantRepository.create(r));
        }
        await this.restaurantRepository.save(rests);
        const rates = this.getRates(rests);
        const comments = this.getComments(rests);
        await this.restaurantRateRepository.save(rates);
        await this.commentRepository.save(comments);
    }
    getRates(rests) {
        const rates = [
            this.restaurantRateRepository.create({
                value: 1,
                restaurant: rests[0],
            }),
            this.restaurantRateRepository.create({
                value: 1,
                restaurant: rests[0],
            }),
            this.restaurantRateRepository.create({
                value: 1,
                restaurant: rests[1],
            }),
            this.restaurantRateRepository.create({
                value: 3,
                restaurant: rests[1],
            }),
            this.restaurantRateRepository.create({
                value: 1,
                restaurant: rests[2],
            }),
            this.restaurantRateRepository.create({
                value: 5,
                restaurant: rests[2],
            }),
            this.restaurantRateRepository.create({
                value: 5,
                restaurant: rests[3],
            }),
            this.restaurantRateRepository.create({
                value: 3,
                restaurant: rests[3],
            }),
            this.restaurantRateRepository.create({
                value: 5,
                restaurant: rests[4],
            }),
            this.restaurantRateRepository.create({
                value: 5,
                restaurant: rests[4],
            }),
            this.restaurantRateRepository.create({
                value: 1,
                restaurant: rests[5],
            }),
            this.restaurantRateRepository.create({
                value: 1,
                restaurant: rests[5],
            }),
            this.restaurantRateRepository.create({
                value: 1,
                restaurant: rests[6],
            }),
            this.restaurantRateRepository.create({
                value: 3,
                restaurant: rests[6],
            }),
            this.restaurantRateRepository.create({
                value: 1,
                restaurant: rests[7],
            }),
            this.restaurantRateRepository.create({
                value: 5,
                restaurant: rests[7],
            }),
            this.restaurantRateRepository.create({
                value: 5,
                restaurant: rests[8],
            }),
            this.restaurantRateRepository.create({
                value: 3,
                restaurant: rests[8],
            }),
            this.restaurantRateRepository.create({
                value: 5,
                restaurant: rests[9],
            }),
            this.restaurantRateRepository.create({
                value: 5,
                restaurant: rests[9],
            }),
        ];
        return rates;
    }
    getComments(rests) {
        const comments = [
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[0],
            }),
            this.commentRepository.create({
                username: 'test user',
                comment: 'ok',
                restaurant: rests[0],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[1],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[1],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[2],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[2],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[3],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[3],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[4],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[4],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[5],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[5],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[6],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[6],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[7],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[7],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[8],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[8],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[9],
            }),
            this.commentRepository.create({
                username: 'test user 1',
                comment: 'ok',
                restaurant: rests[9],
            }),
        ];
        return comments;
    }
}
exports.RestaurantSeed = RestaurantSeed;
//# sourceMappingURL=restaurant.js.map