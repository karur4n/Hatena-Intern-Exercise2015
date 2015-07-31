package Log;
use strict;
use warnings;

use DateTime;

sub new {
    my ($class, %args) = @_;
    return bless \%args, $class;
}

sub protocol {
  my $self = shift;
  my @request = split(' ', $self->{req});
  return $request[2];
}

sub method {
  my $self = shift;
  my @request = split(' ', $self->{req});
  return $request[0];
}

sub path {
  my $self = shift;
  my @request = split(' ', $self->{req});
  return $request[1];
}

sub uri {
  my $self = shift;
  my $host = $self->{host};
  return 'http://' . $host . $self->path;
}

sub time {
  my $self = shift;
  my $dt = DateTime->from_epoch(epoch => $self->{epoch});
  return $dt;
}

sub to_hash {
  my $self = shift;
  my %hash;
  for (qw/status size user referer/) {
    $hash{$_} = $self->{$_} if $self->{$_};
  }

  $hash{'time'} = $self->time;
  $hash{'method'} = $self->method;
  $hash{'uri'} = $self->uri;

  return \%hash;

  # return {
    # 'status'  => $self->{status},
    # 'time'    => $self->time,
    # 'size'    => $self->{size},
    # 'uri'     => $self->uri,
    # 'user'    => $self->{user},
    # 'method'  => $self->method,
    # 'referer' => $self->{referer}
  # };
}

1;
