package Parser;
use strict;
use warnings;

use Log;

sub new {
    my ($class, %args) = @_;
    return bless \%args, $class;
}

sub parse {
  my $self = shift;
  open my $fh, '<', $self->{filename} or die $!;
  my @return;
  while(<$fh>) {
    chomp;
    my %log = map { /^([^:]+):(.*)$/; $1 => $2 } split /\t/;

    for (keys %log) {
      if ($log{$_} eq '-') {
        delete $log{$_};
      }
    }

    push @return, Log->new(%log);
  }
  return \@return;
}

1;
