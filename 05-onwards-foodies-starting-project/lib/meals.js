import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
    region: 'us-east-1'
});

const db = sql('meals.db');

export async function getMeals() {
    await new Promise(resolve => setTimeout(resolve, 5000));

    // throw new Error('Loading meals failed');
    return db.prepare('SELECT * FROM meals').all();
};

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const filename = `${meal.slug}.${extension}`;

    // const stream = fs.createWriteStream(`public/images/${filename}`);
    const bufferedImage = await meal.image.arrayBuffer();

    // stream.write(Buffer.from(bufferedImage), error => {
    //     if (error) {
    //         throw new Error('Saving image failed!');
    //     }
    // });

    s3.putObject({
        Bucket: 'kevinbuaga-nextjs-demo-users-image',
        key: filename,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type
    });

    // meal.image = `/images/${filename}`;

    meal.image = filename;

    db.prepare(`
        INSERT INTO meals ( title, summary, instructions, creator, creator_email, image, slug )
        VALUES
            (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
        `).run(meal);
}