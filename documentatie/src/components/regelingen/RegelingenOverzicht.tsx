import {
  Alert,
  Heading,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@utrecht/component-library-react';
import { Paragraph } from '@utrecht/component-library-react/dist/css-module';
import { Link } from '../Link';
import { useRegelingen } from './useRegelingen';
import './regelingen.css';

export const RegelingenOverzicht = () => {
  const inhoud = useRegelingen();

  if (!inhoud) return <Paragraph>De regelingen worden geladen…</Paragraph>;

  return (
    <>
      <Paragraph>{inhoud.toelichting}</Paragraph>

      <TableContainer>
        <Table>
          <TableCaption>Overzicht van de regelingen</TableCaption>
          <TableHeader>
            <TableRow>
              {['Regeling', 'Gemeenten'].map((kop) => (
                <TableHeaderCell key={kop} scope="col">
                  {kop}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {inhoud.regelingen.map(({ id, naam, gemeentenSamenvatting }) => (
              <TableRow key={id}>
                <TableCell>
                  <Link href={`/regelingen/${id}/`}>{naam}</Link>
                </TableCell>
                <TableCell>{gemeentenSamenvatting}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Alert type="info">
        <Heading level={2}>{inhoud.oproep.titel}</Heading>
        <Paragraph>{inhoud.oproep.tekst}</Paragraph>
      </Alert>
    </>
  );
};
