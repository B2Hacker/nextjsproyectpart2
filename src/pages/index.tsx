import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { GetStaticProps } from "next";
import { microphone } from "../../model/microphone";
import { openDB } from "../openDB";
import Link from 'next/link';

export interface IndexProps {
    microphones: microphone[];
}

export default function index({ microphones }: IndexProps) {
    return (
        <Grid container spacing={3}>
            {microphones.map((microphone) => (
                <Grid item xs={12} sm={3} key={microphone.id}>
                    <Link href="/microphone/[id]" as={`/microphone/${microphone.id}`}>
                        <a>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt={microphone.brand + ' ' + microphone.model}
                                        height="300"
                                        image={microphone.imageUrl}
                                        title={microphone.brand + ' ' + microphone.model}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {microphone.brand + ' ' + microphone.model}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            Lizards are a widespread group of squamate reptiles, with
                                            over 6,000 species, ranging across all continents except
                                            Antarctica
                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </a>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const currentPage = ctx.params?.currentPage as string;
    const currentPageNumber = +(currentPage || 0);

    const min = currentPageNumber * 5;
    const max = (currentPageNumber + 1) * 5;


    const db = await openDB();
    const microphones = await db.all('select * from microphone where id > ? and id <= ?', min, max);

    return { props: { microphones } };
}